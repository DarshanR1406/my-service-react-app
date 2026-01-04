import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useController } from 'react-hook-form';
import { cn } from '../Helper/utils';

// --- Utility: Merge Refs safely ---
// This handles the logic of assigning refs without mutating props directly in the render flow
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        // It is safe to mutate current here as it's inside a closure
        ref.current = value;
      }
    });
  };
}

// 1. The Pure UI Component
const BaseInput = React.forwardRef(
  (
    {
      className,
      type,
      label,
      error,
      invalid,
      id: propId,
      required,
      disable = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = propId || generatedId;

    // Determine if input has error state (either specific error message or explicit invalid flag)
    const hasError = invalid || !!error;

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {label && (
          <LabelPrimitive.Root
            htmlFor={id}
            className="text-custom-text text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </LabelPrimitive.Root>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'focus:border-custom-primary flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50',
            hasError && 'border-red-500 focus:border-red-500',
            className,
          )}
          id={id}
          disabled={disable}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);
BaseInput.displayName = 'BaseInput';

// 2. The Controlled Component
const ControlledInput = ({
  control,
  name,
  rules,
  label,
  required,
  inputRef,
  ...props
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: required ? `${label || 'Field'} is required` : false,
      ...rules,
    },
  });

  // Combine the React Hook Form ref with the user's passed ref
  // We use useMemo to prevent creating a new function on every render
  const mergedRef = React.useMemo(
    () => mergeRefs(field.ref, inputRef),
    [field.ref, inputRef],
  );

  // Suppress "required" error message as per user request
  const errorMessage =
    fieldState.error?.type === 'required' ? null : fieldState.error?.message;

  // Pass explicit invalid state based on whether there is any error
  const isInvalid = !!fieldState.error;

  return (
    <BaseInput
      {...props}
      {...field}
      label={label}
      required={required}
      error={errorMessage}
      invalid={isInvalid}
      ref={mergedRef}
    />
  );
};

// 3. The Main Exported Component
const Input = React.forwardRef((props, ref) => {
  const { control, name } = props;

  if (control && name) {
    return <ControlledInput {...props} inputRef={ref} />;
  }

  return <BaseInput {...props} ref={ref} />;
});

Input.displayName = 'Input';

export { Input };
