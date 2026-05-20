/*
=====================================================
LOADING
=====================================================
*/

function mostrarSkeleton(
    quantidade = 6
) {

    empresaGrid.innerHTML = `
    
        ${Array(quantidade)
            .fill("")
            .map(() => `

                <div class="skeleton-card">

                    <div
                        class="
                            skeleton
                            skeleton-image
                        "
                    ></div>

                    <div class="skeleton-content">

                        <div
                            class="
                                skeleton
                                skeleton-title
                            "
                        ></div>

                        <div
                            class="
                                skeleton
                                skeleton-text
                            "
                        ></div>

                        <div
                            class="
                                skeleton
                                skeleton-text
                            "
                        ></div>

                        <div
                            class="
                                skeleton
                                skeleton-category
                            "
                        ></div>

                        <div
                            class="
                                skeleton
                                skeleton-button
                            "
                        ></div>

                    </div>

                </div>

            `).join("")}

    `;

}