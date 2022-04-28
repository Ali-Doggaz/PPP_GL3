import React from 'react'
import styles from '../styles/components/Card.module.scss'
import { Input } from '@nextui-org/react'

export interface CardProps {
    children: any,
    disappear?:boolean,
}

export default function Card({ children, disappear }: CardProps) {

    return (
        <div className={`${styles.container} ${disappear?styles.disappear:styles.appear}`}>
            {children}
        </div>
    )
}
