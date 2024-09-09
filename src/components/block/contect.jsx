import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

const Contect = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    };

    try {
      const response = await fetch(`${baseUrl}/api/users/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        alert("Form submitted successfully!");

        // Clear form fields after submission
        setName("");
        setEmail("");
        setMobile(""); // Clear mobile number
        setMessage("");
      } else {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        alert("Failed to submit the form: " + errorText);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-6">
        <Input
          label="Name"
          placeholder="Enter your name"
          fullWidth
          labelPlacement="outside"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          fullWidth
          labelPlacement="outside"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Mobile"
          placeholder="Enter your mobile number"
          fullWidth
          labelPlacement="outside"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <Textarea
          label="Message"
          placeholder="Enter your message"
          labelPlacement="outside"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button
          type="submit"
          isDisabled={isSubmitting || !name || !email || !mobile || !message}
          className="bg-blue-500 text-white w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Contect;
