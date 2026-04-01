import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type TransmissionEmailProps = {
  name: string;
  email: string;
  organization?: string;
  transmissionType: string;
  urgency: string;
  message: string;
  leadId: string;
};

export function TransmissionEmail({
  name,
  email,
  organization,
  transmissionType,
  urgency,
  message,
  leadId,
}: TransmissionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New portfolio message from ${name}`}</Preview>
      <Body
        style={{
          margin: "0",
          backgroundColor: "#050816",
          color: "#f8fbff",
          fontFamily: "Manrope, Arial, sans-serif",
        }}
      >
        <Container
          style={{
            margin: "0 auto",
            maxWidth: "640px",
            padding: "32px 24px",
          }}
        >
          <Section
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(125,231,255,0.18)",
              background:
                "linear-gradient(180deg, rgba(13,21,41,0.94), rgba(7,12,24,0.98))",
              padding: "28px",
            }}
          >
            <Text
              style={{
                margin: "0 0 12px",
                color: "#7df9ff",
                fontSize: "12px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Portfolio Contact
            </Text>
            <Heading style={{ margin: "0", fontSize: "30px", lineHeight: "1.1" }}>
              New message from {name}
            </Heading>
            <Text style={{ color: "#b8c6dd", fontSize: "15px", lineHeight: "1.8" }}>
              Lead ID: {leadId}
            </Text>

            <Hr style={{ borderColor: "rgba(125,231,255,0.16)", margin: "20px 0" }} />

            <Text style={{ color: "#b8c6dd", lineHeight: "1.8" }}>
              <strong style={{ color: "#f8fbff" }}>Email:</strong> {email}
              <br />
              <strong style={{ color: "#f8fbff" }}>Organization:</strong>{" "}
              {organization || "Independent / not specified"}
              <br />
              <strong style={{ color: "#f8fbff" }}>Message Type:</strong>{" "}
              {transmissionType}
              <br />
              <strong style={{ color: "#f8fbff" }}>Urgency:</strong> {urgency}
            </Text>

            <Section
              style={{
                marginTop: "22px",
                borderRadius: "18px",
                background: "rgba(7, 17, 34, 0.85)",
                padding: "18px 20px",
              }}
            >
              <Text
                style={{
                  margin: "0 0 10px",
                  color: "#ff4fd8",
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Message Details
              </Text>
              <Text style={{ margin: "0", color: "#f8fbff", lineHeight: "1.85" }}>
                {message}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
