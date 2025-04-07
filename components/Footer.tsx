import React from "react";

interface FooterProps {}

export default function Footer({}: FooterProps) {
  return (
    <div className="caption">
      {"Made by "}
      <a
        href="https://www.linkedin.com/in/samantha-yeung-profile/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline">
        Samantha Yeung
      </a>
      {" & "}
      <a
        href="https://linkedin.com/in/kelvinhkwong"
        target="_blank"
        rel="noopener noreferrer"
        className="underline">
        Kelvin Wong
      </a>
    </div>
  );
}
