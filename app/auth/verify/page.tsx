export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Vérifiez votre email</h1>
        <p className="mb-6">
          Nous avons envoyé un lien de confirmation à votre adresse email. Veuillez cliquer sur ce lien pour activer
          votre compte.
        </p>
        <p className="text-sm text-gray-500">
          Si vous ne recevez pas d'email dans les prochaines minutes, vérifiez votre dossier de spam.
        </p>
      </div>
    </div>
  )
}

