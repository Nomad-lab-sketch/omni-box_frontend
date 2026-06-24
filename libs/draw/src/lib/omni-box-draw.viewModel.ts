import { ViewModelContract } from '@omni-box/sys-core';
import { ChangeEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseOmniBoxDrawViewModelState {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasWrapperRef: RefObject<HTMLDivElement | null>;
  color: string;
}

interface UseOmniBoxDrawViewModelAction {
  changeColor: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Coordinate {
  x: number;
  y: number;
}

export function useOmniBoxDrawViewModel(): ViewModelContract<
  UseOmniBoxDrawViewModelState,
  UseOmniBoxDrawViewModelAction
> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [isPainting, setIsPainting] = useState<boolean>(false);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const [color, setColor] = useState<string>('#000000');

  const changeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);

    throw new Error('unhandle error');
  };

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWrapper = canvasWrapperRef.current;

    if (canvas && canvasWrapper) {
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        if (entry) {
          const { width, height } = entry.contentRect;

          canvas.width = width;
          canvas.height = height;
        }
      });

      resizeObserver.observe(canvasWrapper);

      return () => {
        resizeObserver.unobserve(canvasWrapper);
        resizeObserver.disconnect();
      };
    }

    return void 0;
  }, []);

  /**
   * Старт рисования
   */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return void 0;

    canvas.addEventListener('mousedown', startPaint);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  /**
   * Режим рисования
   */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  /**
   * Выходим из paint режима
   */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  return {
    action: { changeColor },
    state: { canvasRef, canvasWrapperRef, color },
  };
}
