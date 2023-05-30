const FormControl = ({ handleSubmit, onSubmit, children }) => {
  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default FormControl;
