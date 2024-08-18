// Refactoring this component here outside of the 'app' folder so that it contains only route
// based folders
export default function Header() {
  return (
    <>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
}
