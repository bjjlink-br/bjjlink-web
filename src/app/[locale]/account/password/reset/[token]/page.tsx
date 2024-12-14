"use client"

import { useParams } from 'next/navigation';

const ResetPasswordPage = () => {
    const { token } = useParams();
  console.log(token)

  return (
    <div>
      <h1>Senha redefinida com sucesso</h1>
      <button>Fazer login</button>
    </div>
  );
};

export default ResetPasswordPage;
