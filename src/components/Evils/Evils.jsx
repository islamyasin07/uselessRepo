import CharacterGallery from "../CharacterGallery";

export default function EvilsCharacters({ setBackground, onSelectCharacter }) {
  return (
    <CharacterGallery
      side="evil"
      setBackground={setBackground}
      onSelectCharacter={onSelectCharacter}
      accent="rose"
    />
  );
}
