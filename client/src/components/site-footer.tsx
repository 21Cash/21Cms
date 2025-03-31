export const SiteFooter = () => {
  return (
    <footer className="mt-auto w-full p-6 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} 21CMS by Sushil L.
        </p>
      </div>
    </footer>
  );
};
