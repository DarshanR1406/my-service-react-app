import React from 'react';
import { useForm } from 'react-hook-form';
import { IconMail, IconLock } from '@tabler/icons-react';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    alert('Login successful! check console for data');
  };

  return (
    <div className="grid h-screen w-full overflow-hidden bg-white lg:grid-cols-4 dark:bg-slate-950">
      {/* Left Side: Hero Image */}
      <div className="relative col-span-3 hidden h-full flex-col items-center justify-center overflow-hidden bg-slate-900 p-12 lg:flex">
        <div className="animate-slow-zoom relative z-10 flex w-full max-w-2xl flex-col items-center">
          <img
            src="/src/assets/login-hero - Copy.png"
            alt="Service Connect"
            className="max-h-[75vh] w-full object-contain drop-shadow-2xl"
          />
          <div className="mt-4 max-w-xl space-y-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Seamless Service{' '}
              <span className="text-custom-primary">Connections</span>
            </h2>
            <p className="text-lg text-slate-400">
              Empowering providers and customers with a unified platform for
              efficient service delivery.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />

        {/* Decorative lighting effects */}
        <div className="bg-custom-primary/20 absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-[120px]" />
      </div>

      {/* Right Side: Form */}
      <div className="relative z-20 col-span-1 flex h-full w-full flex-col justify-center bg-white px-4 py-12 shadow-2xl sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative space-y-2">
              <Input
                label="Email"
                type="email"
                placeholder="name@example.com"
                control={control}
                name="email"
                required={true}
                disabled={false}
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                className="pl-10"
              />
              <IconMail className="pointer-events-none absolute top-[34px] left-3 h-4 w-4 text-slate-400" />
            </div>

            <div className="relative space-y-2">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                control={control}
                name="password"
                required={true}
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                className="pl-10"
              />
              <IconLock className="pointer-events-none absolute top-[34px] left-3 h-4 w-4 text-slate-400" />
            </div>

            <Button
              type="submit"
              className="shadow-custom-primary/20 hover:shadow-custom-primary/30 w-full py-6 text-base shadow-lg transition-shadow duration-300"
              disabled={isSubmitting}
              text={isSubmitting ? 'Signing in...' : 'Sign in'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
