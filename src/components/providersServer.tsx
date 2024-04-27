import { SupportedLocale } from "@/i18n";
import pick from "just-pick";
import { NextIntlClientProvider, useMessages } from "next-intl";

type ProviderProps = {
	locale: SupportedLocale;
	children: React.ReactNode | React.ReactNode[];
};

export default function ProvidersClient({ children, locale }: ProviderProps) {
	const messages = useMessages();

	return (
		<>
			<NextIntlClientProvider
				messages={pick(messages, ["UI"])}
				locale={locale}
			>
				{children}
			</NextIntlClientProvider>
		</>
	);
}
