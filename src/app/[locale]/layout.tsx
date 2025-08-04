import {NextIntlClientProvider, hasLocale, Locale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ApolloWrapper } from '@/providers/ApolloWrapper';
import Navbar from '@/components/Navbar';
import "./globals.css";
import {ReactNode} from 'react';


type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

 
export default async function LocaleLayout({
  children,
  params
}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await  params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body>
        <ApolloWrapper>
         
          <NextIntlClientProvider>
             <Navbar />
            {children}</NextIntlClientProvider>
        </ApolloWrapper>
        
      </body>
    </html>
  );
}