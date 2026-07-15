import { useEffect } from "react";

export default function SEO({ schema }) {
    useEffect(() => {
        if (!schema) return;
        
        const id = "page-structured-data";
        let script = document.getElementById(id);
        
        if (!script) {
            script = document.createElement("script");
            script.id = id;
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }
        
        script.textContent = JSON.stringify(schema);
        
        return () => {
            const existing = document.getElementById(id);
            if (existing) {
                existing.remove();
            }
        };
    }, [schema]);

    return null;
}
