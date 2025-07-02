'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Contains uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Contains special character',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function getPasswordStrength(password: string): {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  percentage: number;
} {
  const passedRequirements = requirements.filter(req => req.test(password)).length;
  const percentage = (passedRequirements / requirements.length) * 100;
  
  let level: 'weak' | 'fair' | 'good' | 'strong';
  if (percentage < 40) level = 'weak';
  else if (percentage < 60) level = 'fair';
  else if (percentage < 80) level = 'good';
  else level = 'strong';

  return {
    score: passedRequirements,
    level,
    percentage,
  };
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password);
  
  const strengthColors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthLabels = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  };

  if (!password) return null;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          <span className={cn(
            'font-medium',
            strength.level === 'weak' && 'text-red-600',
            strength.level === 'fair' && 'text-orange-600',
            strength.level === 'good' && 'text-yellow-600',
            strength.level === 'strong' && 'text-green-600',
          )}>
            {strengthLabels[strength.level]}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-300 rounded-full',
              strengthColors[strength.level]
            )}
            style={{ width: `${strength.percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-2 text-xs',
                isPassed ? 'text-green-600' : 'text-gray-500'
              )}
            >
              {isPassed ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
              <span>{requirement.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
