import { useTranslation } from "react-i18next";

export function AboutPage() {
  const { t } = useTranslation();

  return <div className="p-2">{t("pages.about.greeting")}</div>;
}
