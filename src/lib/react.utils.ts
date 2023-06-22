import { isValidElement, type ReactNode } from "react";

export function findChildrenByType(
  children: ReactNode,
  type: any,
): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>[] {
  if (!Array.isArray(children)) return [];
  const childs = children.filter(item => {
    return isValidElement(item) && item.type === type;
  });
  return childs;
}

export function randomNumber(): number {
  const rawValue = Math.random().toString();
  const value = Number.parseInt(rawValue.substring(2, 14), 10);
  return value;
}
