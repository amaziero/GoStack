import { ValidationError } from 'yup';

interface ErrosProps {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrosProps {
  const validadtionErrors: ErrosProps = {};

  err.inner.forEach(errorMessage => {
    validadtionErrors[errorMessage.path] = errorMessage.message;
  });

  return validadtionErrors;
}
