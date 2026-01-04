import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../Helper/utils';

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      text,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const variants = {
      default:
        'bg-custom-primary text-white hover:opacity-90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200',
      outline:
        'border border-custom-primary bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
      ghost:
        'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
      link: 'text-custom-primary underline-offset-4 hover:underline dark:text-slate-50',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {text ? text : children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button };
