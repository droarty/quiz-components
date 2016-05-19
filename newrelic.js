var config = require('config');

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Whether or not the agent should run. It doesn't prevent the module from
   * bootstrapping its instrumentation or setting up all its pieces, it just
   * prevents it from starting up or connecting to New Relic's servers. Defaults
   * to true.
   */
  agent_enabled: config.get('new_relic_enabled'),
  /**
   * Array of application names.
   */
  app_name: [config.get('new_relic_app_name')],
  /**
   * Your New Relic license key.
   */
  license_key: config.get('new_relic_license_key'),
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'warn',
    filepath: require('path').join(process.cwd(), 'log/newrelic_agent.log')
  }
}
