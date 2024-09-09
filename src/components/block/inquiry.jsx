import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

const Contect = ({ title, url, image }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API request to submit the form data
    const formData = {
      name,
      email,
      mobile, // Add mobile number to form data
      message,
      title, // Add title to form data
      url, // Add url to form data
      image, // Add image to form data
    };

    try {
      const response = await fetch(`${baseUrl}/api/users/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);

        // Show success message on button for 3 seconds
        setButtonText("Sent Successfully!");
        setTimeout(() => {
          setButtonText("Submit");
        }, 3000);

        // Clear form fields after submission
        setName("");
        setEmail("");
        setMobile(""); // Clear mobile number
        setMessage("");
      } else {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        setButtonText("Submission Failed");
        setTimeout(() => {
          setButtonText("Submit");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setButtonText("Submission Failed");
      setTimeout(() => {
        setButtonText("Submit");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-6">
        <Input
          label="Name"
          placeholder="Enter your name"
          fullWidth
          color="success"
          labelPlacement="outside"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          fullWidth
          color="success"
          labelPlacement="outside"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Mobile"
          placeholder="Enter your mobile number"
          fullWidth
          color="success"
          labelPlacement="outside"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <Textarea
          label="Message"
          color="success"
          placeholder="Enter your message"
          labelPlacement="outside"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button
          type="submit"
          color="success"
          isDisabled={isSubmitting || !name || !email || !mobile || !message}
          className="bg-black text-white w-36"
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </Button>
      </form>
    </div>
  );
};

export default Contect;
