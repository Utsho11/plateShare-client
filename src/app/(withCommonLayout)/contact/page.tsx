"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import PSForm from "@/src/components/form/PSForm";
import PSInput from "@/src/components/form/PSInput";
import PSTextArea from "@/src/components/form/PSTextArea";
import { useSendEmail } from "@/src/hooks/auth.hook";

const ContactPage = () => {
  const { mutate: sendEmail, isPending } = useSendEmail();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    sendEmail(data);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="my-2 text-3xl font-bold">Send Email</h3>
      </div>
      <p className="mb-4">A social pl atform for recipe sharing.</p>
      <div className="w-[22rem]">
        <PSForm onSubmit={onSubmit}>
          <div className="my-4">
            <PSInput label="Enter your email" name="email" type="email" />
          </div>
          <div className="my-4">
            <PSInput label="Enter your subject" name="subject" type="subject" />
          </div>
          <div className="my-4">
            <PSTextArea
              label="Enter your email"
              name="message"
              type="message"
            />
          </div>
          <div className="my-4">
            <Button color="primary" isLoading={isPending} type="submit">
              Send
            </Button>
          </div>
        </PSForm>
      </div>
    </div>
  );
};

export default ContactPage;
