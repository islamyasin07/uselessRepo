import CharacterGallery from "../CharacterGallery";

export default function AnimeCharacters({ setBackground, onSelectCharacter }) {
  return (
    <CharacterGallery
      side="angel"
      setBackground={setBackground}
      onSelectCharacter={onSelectCharacter}
      accent="sky"
    />
  );
}
