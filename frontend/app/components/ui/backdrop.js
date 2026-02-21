export function BackdropProfile({ setIsOpenProfile }) {
  return (
    <div
      onClick={() => setIsOpenProfile(false)}
      className="fixed inset-0 z-40"
    ></div>
  );
}
