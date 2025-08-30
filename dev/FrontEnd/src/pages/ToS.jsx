import {
  Button,
  Flex,
  Title,
  Text,
  List,
  Divider,
  Space,
  Paper,
  Anchor,
  
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToS = () => {
  const nav = useNavigate();

  return (
    <Flex direction="column" h="90vh" p="md">
      <Flex justify="space-between" align="center" mb="sm">
        <Title order={3}>Momentum Terms of Service</Title>
        <Button variant="light" onClick={() => nav('/')}>
          Back
        </Button>
      </Flex>

      <Paper
        withBorder
        shadow="sm"
        p="md"
        radius="md"
        style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 0, 
        }}
      >
        <Text size="sm" c="dimmed" mb="sm">
          Effective Date: 7/23/2025
        </Text>

        <Divider my="md" />

        <Text size="md" mb="sm">
          Welcome to Momentum, a productivity platform designed to help users, especially those with ADHD or similar neurodiverse conditions, organize, track, and achieve their goals through gamification, behavioral insights, and science-backed strategies.
        </Text>

        <Text size="sm" c="dimmed">
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using Momentum. By using Momentum or creating an account, you agree to these Terms.
        </Text>

        <Divider my="md" />

        <List type="ordered" spacing="lg" size="md">
          <List.Item>
              <Text fw={600}>Acceptance of Terms</Text>
              <Text>
                By accessing or using Momentum, you agree to be bound by these Terms and our <Anchor>Privacy Policy</Anchor>. If you do not agree, please do not use the app or its services.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Description of Service</Text>
              <List spacing="xs" withPadding>
                <List.Item>Goal tracking and organization tools</List.Item>
                <List.Item>Gamified progress and achievements</List.Item>
                <List.Item>Avatar-based motivation</List.Item>
                <List.Item>Collaborative features (optional)</List.Item>
                <List.Item>Behavioral analytics for personal growth</List.Item>
                <List.Item>Optional insights based on ADHD research</List.Item>
              </List>
              <Text c="dimmed">
                Momentum is not a substitute for medical or psychological advice or treatment.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Eligibility</Text>
              <List withPadding>
                <List.Item>Be at least 13 years old (or legal minimum in your region)</List.Item>
                <List.Item>Have the legal capacity to enter into a binding agreement</List.Item>
                <List.Item>If under 18, use under supervision of a parent or guardian</List.Item>
              </List>
            </List.Item>

            <List.Item>
              <Text fw={600}>User Accounts</Text>
              <Text>You are responsible for:</Text>
              <List withPadding>
                <List.Item>Maintaining the confidentiality of your login credentials</List.Item>
                <List.Item>All activity under your account</List.Item>
                <List.Item>Providing accurate, complete, and up-to-date information</List.Item>
              </List>
              <Text>
                Momentum reserves the right to suspend or delete accounts for misuse or violation of these Terms.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>User Responsibilities</Text>
              <List withPadding>
                <List.Item>Do not use the platform for unlawful purposes</List.Item>
                <List.Item>No impersonation or false information</List.Item>
                <List.Item>Do not attempt to access or alter server or code</List.Item>
                <List.Item>No uploading harmful code (malware, viruses)</List.Item>
              </List>
            </List.Item>

            <List.Item>
              <Text fw={600}>Data and Privacy</Text>
              <Text>We commit to:</Text>
              <List withPadding>
                <List.Item>Never selling your personal data</List.Item>
                <List.Item>Using hashed passwords and secure tokens</List.Item>
                <List.Item>Using collected data to improve features</List.Item>
              </List>
              <Text>
                See our full <Anchor>Privacy Policy</Anchor> for details.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Content Ownership</Text>
              <Text>You retain ownership of your content. However, you grant us a limited license to:</Text>
              <List withPadding>
                <List.Item>Operate and improve the platform</List.Item>
                <List.Item>Provide behavioral analytics and insights</List.Item>
                <List.Item>Use anonymized data for research (if you opt in)</List.Item>
              </List>
              <Text>
                We will never share identifiable information without your consent.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Mental Health Notice</Text>
              <Text>
                Momentum is a supportive tool—not a clinical service. Consult licensed professionals for medical help. If in crisis, contact local emergency services.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Modifications to the Service</Text>
              <Text>
                We may change or discontinue features at any time. Continued use implies acceptance of such changes.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Termination</Text>
              <Text>
                You may terminate your account at any time. We may suspend accounts for harmful behavior or Terms violations. Data is deleted per our <Anchor>Data Retention Policy</Anchor>.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Disclaimers</Text>
              <Text>
                Momentum is provided &quot;as is.&quot; No guarantees on performance or suitability.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Limitation of Liability</Text>
              <Text>
                We are not liable for indirect damages, productivity loss, or mental health outcomes. Total liability is limited to fees paid, if any.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Governing Law</Text>
              <Text>
                These Terms follow the laws of the State of Florida, USA, unless overridden by local laws.
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Contact</Text>
              <Text>
                📧 <Anchor href="mailto:support@momentumapp.dev">support@momentumapp.dev</Anchor>
                <br />
                🏢 5401 Lescot Ln, Orlando, FL 32811
              </Text>
            </List.Item>

            <List.Item>
              <Text fw={600}>Updates</Text>
              <Text>
                These Terms may be updated. We will notify major changes. Continued use means acceptance.
              </Text>
            </List.Item>
        </List>

        <Space h="lg" />

        <Text ta="center" size="xs" c="dimmed">
          Last updated: July 23, 2025
        </Text>
      </Paper>
    </Flex>
  );
};

export default ToS;
