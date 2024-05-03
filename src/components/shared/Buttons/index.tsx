import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
export const EyeButton = ({ onClick, className }: any) => {
    return (
      <RemoveRedEyeOutlinedIcon
        onClick={onClick}
        className={`iconButton w-3 h-3 text-gray cursor-pointer transition-transform duration-300 transform hover:scale-110` + className}
        style={{ width: 16, height: 16 }}
      />
    );
  };