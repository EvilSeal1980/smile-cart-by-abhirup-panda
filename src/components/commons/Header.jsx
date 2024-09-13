import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

/*
we are writing the same JSX in the ProductList and Product
components. To eliminate redundancy, we can extract the
common code into a component named Header.jsx.
*/

const Header = ({ title, shouldShowBackButton = true }) => {
  const history = useHistory();

  return (
    <div className="m-2">
      <div className="flex items-center">
        {shouldShowBackButton && (
          <LeftArrow
            className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
            onClick={history.goBack}
          />
        )}
        <Typography style="h1" weight="semibold">
          {title}
        </Typography>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
  );
};

export default Header;
