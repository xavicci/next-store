import Link from "next/link";
import React from "react";

export const Header = () =>{
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/store'>
                            Store
                        </Link>
                    </li>
                    <li>
                        <Link href='/test'>
                            TEST
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}