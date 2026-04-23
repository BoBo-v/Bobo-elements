import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';
import type {
  SelectProps,
  SelectOption,
} from '../../../core/components/select.react.types';
import Input from '../Input';
import type { InputRef } from '../../../core/components/input.react.types';
import Icon from '../Icon';
import '../../../components/Select/style.css';

export default function Select({
  modelValue,
  options = [],

  placeholder,
  disabled = false,
  clearable = false,
  renderLabel,
  filterable = false,
  filterMethod,
  remote = false,
  remoteMethod,
  onChange,
  'onUpdate:modelValue': onUpdateModelValue,
  onVisibleChange,
  onClear,
}: SelectProps) {
  const findOption = (value: string) => options.find((o) => o.value === value) ?? null;

  const initialOption = findOption(modelValue);
  const [inputValue, setInputValue] = useState(initialOption ? initialOption.label : '');
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(initialOption);
  const [mouseHover, setMouseHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  // Sync options prop changes
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const timeout = remote ? 300 : 0;

  const generateFilterOptions = useCallback(
    async (searchValue: string) => {
      if (!filterable) return;
      if (filterMethod && typeof filterMethod === 'function') {
        setFilteredOptions(filterMethod(searchValue));
      } else if (remote && remoteMethod && typeof remoteMethod === 'function') {
        setLoading(true);
        try {
          const result = await remoteMethod(searchValue);
          setFilteredOptions(result);
        } catch (e) {
          console.error(e);
          setFilteredOptions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredOptions(options.filter((o) => o.label.includes(searchValue)));
      }
      setHighlightIndex(-1);
    },
    [filterable, filterMethod, remote, remoteMethod, options]
  );

  const debouncedFilter = useMemo(
    () => debounce((val: string) => generateFilterOptions(val), timeout),
    [generateFilterOptions, timeout]
  );

  const controlDropdown = useCallback(
    (show: boolean, currentInputValue?: string, currentSelectedOption?: SelectOption | null) => {
      if (show) {
        if (filterable && currentSelectedOption) {
          setInputValue('');
        }
        if (filterable) {
          generateFilterOptions(filterable && currentSelectedOption ? '' : (currentInputValue ?? ''));
        }
      } else {
        if (filterable) {
          setInputValue(currentSelectedOption ? currentSelectedOption.label : '');
        }
        setHighlightIndex(-1);
      }
      setIsDropdownShow(show);
      onVisibleChange?.(show);
    },
    [filterable, generateFilterOptions, onVisibleChange]
  );

  // Click-outside detection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isDropdownShow) {
          controlDropdown(false, inputValue, selectedOption);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownShow, controlDropdown, inputValue, selectedOption]);

  const toggleDropdown = () => {
    if (disabled) return;
    if (isDropdownShow) {
      controlDropdown(false, inputValue, selectedOption);
    } else {
      controlDropdown(true, inputValue, selectedOption);
    }
  };

  const itemSelect = (item: SelectOption) => {
    if (item.disabled) return;
    setInputValue(item.label);
    setSelectedOption(item);
    onChange?.(item.value);
    onUpdateModelValue?.(item.value);
    setIsDropdownShow(false);
    setHighlightIndex(-1);
    onVisibleChange?.(false);
    inputRef.current?.ref?.focus();
  };

  const showClearIcon = clearable && mouseHover && selectedOption && inputValue.trim() !== '';

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue('');
    onClear?.();
    onChange?.('');
    onUpdateModelValue?.('');
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    debouncedFilter(val);
  };

  const filteredPlaceholder =
    filterable && selectedOption && isDropdownShow ? selectedOption.label : placeholder;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (!isDropdownShow) {
          controlDropdown(true, inputValue, selectedOption);
        } else {
          if (highlightIndex > -1 && filteredOptions[highlightIndex]) {
            itemSelect(filteredOptions[highlightIndex]);
          } else {
            controlDropdown(false, inputValue, selectedOption);
          }
        }
        break;
      case 'Escape':
        if (isDropdownShow) {
          controlDropdown(false, inputValue, selectedOption);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (filteredOptions.length > 0) {
          if (highlightIndex === -1 || highlightIndex === 0) {
            setHighlightIndex(filteredOptions.length - 1);
          } else {
            setHighlightIndex(highlightIndex - 1);
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (filteredOptions.length > 0) {
          if (highlightIndex === -1 || highlightIndex === filteredOptions.length - 1) {
            setHighlightIndex(0);
          } else {
            setHighlightIndex(highlightIndex + 1);
          }
        }
        break;
      default:
        break;
    }
  };

  const NOOP = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`vk-select${disabled ? ' is-disabled' : ''}`}
      ref={containerRef}
      onClick={toggleDropdown}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <Input
        modelValue={inputValue}
        disabled={disabled}
        placeholder={filteredPlaceholder}
        ref={inputRef}
        readonly={!filterable || !isDropdownShow}
        onInput={handleInputChange}
        onUpdate:modelValue={handleInputChange}
        onKeyDown={handleKeyDown}
        suffix={
          showClearIcon ? (
            <Icon
              name="circle-xmark"
              className="vk-input__clear"
              onMouseDown={NOOP}
              onClick={handleClear}
            />
          ) : (
            <Icon
              name="angle-down"
              className={`header-angle${isDropdownShow ? ' is-active' : ''}`}
            />
          )
        }
      />
      {isDropdownShow && (
        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 9999 }}>
          {loading ? (
            <div className="vk-select__loading">
              <Icon name="spinner" spin />
            </div>
          ) : filterable && filteredOptions.length === 0 ? (
            <div className="vk-select__nodata">no matching data</div>
          ) : (
            <ul className="vk-select__menu">
              {filteredOptions.map((item, index) => (
                <li
                  key={item.value}
                  className={[
                    'vk-select__menu-item',
                    item.disabled ? 'is-disabled' : '',
                    selectedOption?.value === item.value ? 'is-selected' : '',
                    highlightIndex === index ? 'is-highlighted' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  id={`select-item-${item.value}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    itemSelect(item);
                  }}
                >
                  {renderLabel ? renderLabel(item) : item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
