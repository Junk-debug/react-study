import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

interface Props {
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const SearchBar: React.FC<Props> = ({ disabled, value, onChange, onClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <Input
        placeholder="Type something"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <Button disabled={disabled} onClick={onClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
