import React from 'react';

function Footer(){
    return (
        <footer>
            <div class="container px-6 py-8 mx-auto">
                <hr class="mt-10 border-gray-700" />
                <div class="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p class="text-sm text-gray-500">Team. Core</p>
                    <a href="https://github.com/coreswing/Swing_React" class="mx-2 text-sm text-gray-500 flex" aria-label="Reddit"><img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width='20'/> GitHub</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;