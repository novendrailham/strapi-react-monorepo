// Define the props for the Renderer Button component
interface RendererButtonProps {
  rerender: () => void;
}
// Renderer Button component
const RendererButton = ({ rerender }: RendererButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      onClick={() => rerender()}
    >
      Renderer
    </button>
  );
};

export default RendererButton; 