import {useCallback, useState} from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState<any>();
    const containerRef = useCallback((containerElem: any) => {
        if (containerElem !== null) {
            const { width, height } = containerElem?.getBoundingClientRect();
            setDimensions({ width, height });
            setTranslate({ x: width / 2, y: height / 2 });
        }
    }, []);
    return [dimensions, translate, containerRef];
};
