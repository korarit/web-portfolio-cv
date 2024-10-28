import './globals.css';
import { Fira_Code } from 'next/font/google'

import '@fortawesome/fontawesome-svg-core/styles.css'

const FiraCode = Fira_Code()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
     <body className={FiraCode.className}>
       {children}
     </body>
   </html>
 )
}
    