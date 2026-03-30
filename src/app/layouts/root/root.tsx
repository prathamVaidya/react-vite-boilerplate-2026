import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@widgets/language-select";
import "./app.css";

export function RootLayout() {
  const { t } = useTranslation();

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          {t("nav.home")}
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          {t("nav.about")}
        </Link>
        <LanguageSelect />
      </div>
      <hr />
      <Outlet />
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  );
}
