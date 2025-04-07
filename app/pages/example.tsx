import PhotoStrip from "../../components/PhotoStrip";

export default function ExamplePage() {
  const screenshots = [
    "data:image/png;base64,...", // Replace with actual base64-encoded images
    "data:image/png;base64,...",
  ];

  return (
    <div>
      <h1>Photo Strip</h1>
      {/* Pass screenshots to the PhotoStrip component */}
      <PhotoStrip screenshots={screenshots} />
    </div>
  );
}
