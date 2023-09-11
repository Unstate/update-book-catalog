import { cn } from '../../../utils';
import { FC, HTMLProps } from 'react';

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

const PageLink: FC<Props> = ({
  className,
  active,
  disabled,
  children,
  ...otherProps
}) => {
  const customClassName = cn(`relative inline-flex border-[2px] border-mooduck-black rounded-[4px] bg-mooduck-white px-[10px] py-[10px] text-mooduck-black text-[16px] cursor-pointer mr-[10px] transition-all ease-in first:rounded-[4px] first:bg-[#160F29] first:px-[15px] first:py-[12px] first:relative first:top-[4px] last:rounded-[4px] last:bg-[#160F29] last:px-[15px] last:py-[12px] last:relative last:top-[4px] hover:bg-mooduck-black hover:text-mooduck-white focus:bg-mooduck-black focus:text-mooduck-white disabled:text-[#6c757d] disabled:pointer-events-none ${active ? 'bg-mooduck-black text-mooduck-white' : ''} ${disabled ? 'pointer-events-none text-mooduck-gray' : ''}`, className);

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}

export default PageLink