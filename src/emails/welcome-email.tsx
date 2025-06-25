import { WEB_URL, EMAIL_CONTACT } from '@/constants/config'
import {
  Hr,
  Text,
  Link,
  Button,
  Section,
  Heading,
  Tailwind,
  Markdown,
  Container,
} from '@react-email/components'

type Props = {
  name: string
  markdown: string
}

export default function WelcomeEmail({ name, markdown }: Props) {
  const yearNow = new Date().getFullYear()

  const header = (
    <Heading
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1d4ed8',
        textAlign: 'center',
        marginBottom: '10px',
      }}
    >
      Bem-vindo à Intranet Azeplast
    </Heading>
  )

  const accessButton = (
    <Section style={{ textAlign: 'center', padding: '20px 0' }}>
      <Button
        href={WEB_URL}
        style={{
          backgroundColor: '#1d4ed8',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '16px',
        }}
      >
        Acessar a plataforma
      </Button>
    </Section>
  )

  return (
    <Tailwind>
      <Container style={{ padding: '20px 0', minHeight: '100vh' }}>
        <Container
          style={{
            maxWidth: '600px',
            borderRadius: '10px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            margin: '0 auto',
          }}
        >
          {header}

          <Text style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
            Olá, {name},
          </Text>

          <Markdown>{markdown}</Markdown>

          {accessButton}

          <Text style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
            Em caso de dúvidas, fale com o time responsável pelo e-mail{' '}
            <Link href={`mailto:${EMAIL_CONTACT}`} style={{ color: '#1d4ed8' }}>
              {EMAIL_CONTACT}
            </Link>
            .
          </Text>

          <Text style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
            Atenciosamente, <br /> Equipe Azeplast
          </Text>
        </Container>

        <Hr style={{ margin: '20px 0', borderColor: '#d1d5db' }} />

        <Text style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
          © {yearNow} Azeplast Indústria e Comércio LTDA. Todos os direitos reservados.
        </Text>
      </Container>
    </Tailwind>
  )
}

WelcomeEmail.PreviewProps = {
  name: 'Fulano da Silva',
  markdown: `
## Seja bem-vindo à Intranet

Você já pode explorar os recursos internos da Azeplast, como documentos, avisos e ferramentas.

- Use seu login corporativo
- Atualize suas informações
- Acompanhe comunicados internos

Estamos felizes em ter você aqui!
`,
}
