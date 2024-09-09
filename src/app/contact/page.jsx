"use client";
import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // State for submit status
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(""); // Reset submit status

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
        setSubmitStatus("Form submitted successfully!"); // Set success message

        // Clear form fields after submission
        setName("");
        setEmail("");
        setMobile(""); // Clear mobile number
        setMessage("");

        // Clear success message after 3 seconds
        setTimeout(() => setSubmitStatus(""), 3000);
      } else {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        setSubmitStatus("Failed to submit the form: " + errorText); // Set error message
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmitStatus("There was an error submitting the form"); // Set error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-5 md:px-60">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-4">
        We're here to assist you with any inquiries you may have. Whether you
        have questions about our vehicles, need assistance with a purchase, or
        want to schedule a test drive, please reach out to us using the form
        below. Our team will get back to you as soon as possible.
      </p>
      <p className="text-lg mb-4">
        <strong>Business Hours:</strong>
        <br />
        Monday - Friday: 9:00 AM - 6:00 PM
        <br />
        Saturday: 10:00 AM - 4:00 PM
        <br />
        Sunday: Closed
      </p>
      <p className="text-lg mb-4">
        <strong>Address:</strong>
        <br />
        1234 Car Dealer Lane
        <br />
        Car City, CA 12345
        <br />
        USA
      </p>
      <p className="text-lg mb-4">
        <strong>Phone:</strong>
        <br />
        (123) 456-7890
      </p>
      <p className="text-lg mb-4">
        <strong>Email:</strong>
        <br />
        support@cardealer.com
      </p>
      {submitStatus && (
        <p className="text-lg mb-4 text-green-500">{submitStatus}</p>
      )}
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

export default Page;
