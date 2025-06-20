interface BaseButton {
  text: string;
  className?: string;
  type?: "button" | "link";
  variant: "primary" | "secondary" | "danger";
}

interface LinkProps extends BaseButton {
  type: "link";
  href: string;
}

interface ButtonProps_ extends BaseButton {
  type: "button";
  onClick?: () => void;
}

type ButtonProps = LinkProps | ButtonProps_;
