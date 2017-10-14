'use strict';

module.exports = {
  meta: {
    name: 'repo-admin-team',
    description: 'check repo admin team(s)',
    category: 'Repo',
    recommended: true
  },

  schema: {
    type: 'object',
    properties: {
      required: {
        type: 'boolean',
        default: true
      },
      maximum: {
        type: 'integer',
        minimum: 0
      }
    }
  },

  source: 'teams',

  check(cfg, repoTeams) {
    const admins = repoTeams
                    .filter(t => t.permission == 'admin')
                    .map(t => t.name);
    let msg;
    if (cfg.required && cfg.maximum != 0 && admins.length == 0)
      msg = 'Repo has no required admin team';
    else if (cfg.maximum && admins.length > cfg.maximum)
      msg = `Repo has ${admins.length} admin teams (${cfg.maximum} allowed): ${admins.join(', ')}`;

    if (msg) {
      return {
        valid: false,
        message: msg,
        messages: [msg]
      };
    }

    return {valid: true};
  },

  issue: {
    title: 'Repo admin team(s)',
    comments: {
      create: 'Please check repo admin team(s)'
    }
  }
};