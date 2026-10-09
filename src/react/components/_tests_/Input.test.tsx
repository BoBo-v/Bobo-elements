import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('React Input component', () => {
  test('renders with initial modelValue', () => {
    render(<Input modelValue="hello" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('hello');
  });

  test('triggers onInput, onChange, and onUpdate:modelValue when typing', () => {
    const handleInput = vi.fn();
    const handleChange = vi.fn();
    const handleUpdate = vi.fn();

    render(
      <Input
        modelValue=""
        onInput={handleInput}
        onChange={handleChange}
        onUpdate:modelValue={handleUpdate}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleInput).toHaveBeenCalledWith('test');
    expect(handleChange).toHaveBeenCalledWith('test');
    expect(handleUpdate).toHaveBeenCalledWith('test');
  });

  test('triggers onChange and onInput in textarea mode', () => {
    const handleInput = vi.fn();
    const handleChange = vi.fn();

    render(
      <Input
        type="textarea"
        modelValue=""
        onInput={handleInput}
        onChange={handleChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    fireEvent.change(textarea, { target: { value: 'multiline' } });

    expect(handleInput).toHaveBeenCalledWith('multiline');
    expect(handleChange).toHaveBeenCalledWith('multiline');
  });

  test('clears value and triggers onClear, onChange, onInput when clear icon clicked', () => {
    const handleClear = vi.fn();
    const handleChange = vi.fn();
    const handleInput = vi.fn();

    const { container } = render(
      <Input
        modelValue="clear me"
        clearable
        onClear={handleClear}
        onChange={handleChange}
        onInput={handleInput}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const clearIcon = container.querySelector('.vk-input__clear');
    expect(clearIcon).not.toBeNull();
    fireEvent.click(clearIcon!);

    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('');
    expect(handleInput).toHaveBeenCalledWith('');
  });
});
