import { Hr, Text, Section, Heading, Tailwind, Container } from '@react-email/components'

type Props = {
  code: string
  email: string
}

export default function RecoverPasswordEmail({ code, email }: Props) {
  const yearNow = new Date().getFullYear()

  const recoverPasswordHeading = (
    <Heading
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#10b981',
        textAlign: 'center',
        marginBottom: '10px',
      }}
    >
      Azeplast
    </Heading>
  )

  const recoverPasswordSection = (
    <Section style={{ padding: '20px 0' }}>
      <Container
        style={{
          backgroundColor: '#d1fae5',
          borderRadius: '8px',
          textAlign: 'center',
          padding: '15px 0',
        }}
      >
        <Text
          style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', textAlign: 'center' }}
        >
          {code}
        </Text>
      </Container>
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
          {recoverPasswordHeading}

          <Text style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
            Olá, <br />
            Recebemos uma solicitação para redefinir a senha associada ao e-mail <b>{email}</b>.
          </Text>

          {recoverPasswordSection}

          <Text style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
            Não compartilhe este código com ninguém.
          </Text>

          <Text
            style={{ marginTop: '10px', color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}
          >
            Se você não solicitou uma redefinição de senha, ignore este e-mail.
          </Text>

          <Text style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
            — A equipe da Azeplast
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

RecoverPasswordEmail.PreviewProps = {
  code: '123456',
  email: 'email@email.com',
}
