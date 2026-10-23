import './arFixedButton.css'

interface ArFixedButtonProps{
    alternState: () => void;
    fixedState: boolean
}

export function ArFixedButton({alternState , fixedState}: ArFixedButtonProps ) {
  return (
    <button className="button-fixed"
      onClick={alternState}
    >
      {fixedState ? "Realocar" : "Fixar"}
    </button>
  );
}
