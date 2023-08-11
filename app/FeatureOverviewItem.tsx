'use client'
import * as Popover from '@radix-ui/react-popover'
import { FC, ReactNode } from 'react'
import InfoIcon from './images/info.svg'
export const FeatureOverviewItem: FC<{ title: string; children: ReactNode; link: string }> = ({ title, children, link }) => (
  <span className="inline-flex items-center text-accent-solidHover gap-1">
    <a href={link} className="text-accent-solidHover">
      {title}
    </a>
    <Popover.Root>
      <Popover.Trigger className="text-accent-solid">
        <InfoIcon />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          className="prose feature-overview-popover rounded p-5 w-64 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {children}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  </span>
)
