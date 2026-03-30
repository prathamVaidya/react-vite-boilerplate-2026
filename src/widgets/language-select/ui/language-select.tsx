import { type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

const languages = ["en", "es"] as const;

export function LanguageSelect() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await i18n.changeLanguage(event.target.value);
  };

  return (
    <label className="ml-auto flex items-center gap-2">
      <span>{t("nav.language")}:</span>
      <select value={currentLanguage} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {t(`language.${lang}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
