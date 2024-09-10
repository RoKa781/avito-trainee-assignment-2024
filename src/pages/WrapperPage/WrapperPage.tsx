interface WrapperPageProps {
  children: React.ReactNode;
}

const WrapperPage: React.FC<WrapperPageProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default WrapperPage;
