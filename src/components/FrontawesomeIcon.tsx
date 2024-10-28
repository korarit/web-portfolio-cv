'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library , config } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
config.autoAddCss = false

import { IconProp } from '@fortawesome/fontawesome-svg-core'

export default function FrontawesomeIcon({className, icon}: Readonly<{className: string;icon: string;}>) {
    return (
        <FontAwesomeIcon icon={icon as IconProp} className={className} />    
    );

}