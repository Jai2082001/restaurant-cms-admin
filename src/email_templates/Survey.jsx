// src/emailTemplates/SurveyRequest.js
import React from "react";
import { Body, Container, Text, Heading, Section, Row, Column, Button} from "@react-email/components";

const SurveyRequest = ({ userName, surveyLink }) => {
  return (
    <Body>
      <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Heading>We Value Your Feedback!</Heading>
        <Text>Hi {userName},</Text>
        <Text>We hope you’re enjoying our products and services. We’d love to hear your thoughts!</Text>
        <Text>
          Please take a few minutes to complete our survey: <a href={surveyLink}>Take the Survey</a>
        </Text>
        <Text>Your feedback helps us improve and serve you better.</Text>
        <Text>Thank you!</Text>
      </Container>
    </Body>
  );
};

export default SurveyRequest;

const EmailTemplate = () => {
    return (
        <Section className="py-[16px] text-center">
  <Text className="my-[8px] text-[18px] font-semibold leading-[28px] text-indigo-600">
    Your opinion matters
  </Text>
  <Heading
    as="h1"
    className="m-0 mt-[8px] text-[30px] font-semibold leading-[36px] text-gray-900"
  >
    We want to hear you
  </Heading>
  <Text className="text-[16px] leading-[24px] text-gray-700">
    How would you rate your experience using our product in a scale from 1 to
    5?
  </Text>
  <Row>
    <Column align="center">
      <table>
        <tr>
          {[1, 2, 3, 4, 5].map((number) => (
            <td align="center" className="p-[4px]" key={number}>
              <Button
                className="h-[20px] w-[20px] rounded-[8px] border border-solid border-indigo-600 p-[8px] font-semibold text-indigo-600"
                // Replace with the proper URL that saves the selected number
                href="https://react.email"
              >
                {number}
              </Button>
            </td>
          ))}
        </tr>
      </table>
    </Column>
  </Row>
</Section>
    )
}
