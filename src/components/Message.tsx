interface IProps {
  message: string;
}

const Message: React.FC<IProps> = ({ message }) => {
  return <div className="mt-20">{message}</div>;
};

export default Message;
