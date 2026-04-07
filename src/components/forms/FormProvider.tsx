// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
};

export default function FormProvider({ children, methods }: Readonly<Props>) {
  return <Form {...methods}>{children}</Form>;
}
