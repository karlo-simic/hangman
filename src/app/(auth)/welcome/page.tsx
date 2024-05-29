import { WelcomeForm } from "@/features/authentication/login";

export default function Page() {
  return (
    <main className="flex-1 grid place-items-center">
      <div className="flex flex-col gap-y-16">
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-5xl font-bold">Hangman</h1>
          <p>Welcome to hangman, to begin please enter your name.</p>
        </div>
        <WelcomeForm />
      </div>
    </main>
  );
}
